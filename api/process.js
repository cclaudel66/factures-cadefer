import formidable from 'formidable'
import fs from 'fs'
import path from 'path'
import os from 'os'
import XLSX from 'xlsx'
import { PDFDocument } from 'pdf-lib'
import archiver from 'archiver'

export const config = {
  api: {
    bodyParser: false,
  },
}

function clean(text) {
  return String(text)
    .replace(/\s+/g, '')
    .replace(/[^a-zA-Z0-9_-]/g, '')
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({
      error: 'Méthode non autorisée',
    })
  }

  const form = formidable({ multiples: false })

  form.parse(req, async (err, fields, files) => {
    if (err) {
      return res.status(500).json({
        error: 'Erreur upload fichiers',
      })
    }

    try {
      const pdfFile = files.pdf[0]
      const excelFile = files.excel[0]

      const workbook = XLSX.readFile(excelFile.filepath)

      const sheet = workbook.Sheets['2026']

      const data = XLSX.utils.sheet_to_json(sheet, {
        header: 1,
      })

      const mapping = {}

      for (let i = 1; i < data.length; i++) {
        const row = data[i]

        if (!row) continue

        const registro = row[0]
        const fournisseur = row[1]
        const facture = row[2]

        if (registro) {
          mapping[registro] = {
            fournisseur,
            facture,
          }
        }
      }

      const pdfBytes = fs.readFileSync(pdfFile.filepath)

      const pdfDoc = await PDFDocument.load(pdfBytes)

      const pages = pdfDoc.getPages()

      const tempDir = fs.mkdtempSync(
        path.join(os.tmpdir(), 'factures-')
      )

      let currentRegistro = Object.keys(mapping)[0]

      for (let i = 0; i < pages.length; i++) {
        const newPdf = await PDFDocument.create()

        const [copiedPage] = await newPdf.copyPages(pdfDoc, [i])

        newPdf.addPage(copiedPage)

        const pdfBytesSingle = await newPdf.save()

        const fournisseur =
          mapping[currentRegistro]?.fournisseur || 'FACTURE'

        const facture =
          mapping[currentRegistro]?.facture || i + 1

        const filename =
          clean(fournisseur) +
          '_' +
          clean(facture) +
          '.pdf'

        fs.writeFileSync(
          path.join(tempDir, filename),
          pdfBytesSingle
        )

        currentRegistro =
          Number(currentRegistro) + 1
      }

      res.setHeader(
        'Content-Type',
        'application/zip'
      )

      res.setHeader(
        'Content-Disposition',
        'attachment; filename=factures.zip'
      )

      const archive = archiver('zip')

      archive.pipe(res)

      const filesList = fs.readdirSync(tempDir)

      for (const file of filesList) {
        archive.file(path.join(tempDir, file), {
          name: file,
        })
      }

      await archive.finalize()
    } catch (e) {
      console.error(e)

      return res.status(500).json({
        error: e.message,
      })
    }
  })
}
