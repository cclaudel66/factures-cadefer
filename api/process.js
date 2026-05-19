import formidable from 'formidable'
import fs from 'fs'
import XLSX from 'xlsx'

export const config = {
  api: {
    bodyParser: false,
  },
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
      const excelFile = files.excel[0]

      const workbook = XLSX.readFile(excelFile.filepath)

      const sheet = workbook.Sheets['2026']

      const data = XLSX.utils.sheet_to_json(sheet)

      console.log(data)

      return res.status(200).json({
        success: true,
        message: 'Excel lu correctement',
        lignes: data.length,
      })
    } catch (e) {
      return res.status(500).json({
        error: e.message,
      })
    }
  })
}
