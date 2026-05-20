import { useState } from 'react'

export default function App() {
  const [pdfFile, setPdfFile] = useState(null)
  const [excelFile, setExcelFile] = useState(null)

  return (
    <div style={{
      padding: 40,
      fontFamily: 'Arial',
      background: '#f5f5f5',
      minHeight: '100vh'
    }}>
      <div style={{
        background: 'white',
        padding: 30,
        borderRadius: 20,
        maxWidth: 900,
        margin: '0 auto'
      }}>
        <h1>Factures Cadefer</h1>

        <p>
          Déposez votre PDF et votre Excel.
        </p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 20,
          marginTop: 30
        }}>
          <div>
            <h2>PDF</h2>

            <input
              type="file"
              accept=".pdf"
              onChange={(e) => setPdfFile(e.target.files[0])}
            />

            {pdfFile && (
              <p>{pdfFile.name}</p>
            )}
          </div>

          <div>
            <h2>Excel</h2>

            <input
              type="file"
              accept=".xlsx,.xls"
              onChange={(e) => setExcelFile(e.target.files[0])}
            />

            {excelFile && (
              <p>{excelFile.name}</p>
            )}
          </div>
        </div>

        <button style={{
          marginTop: 30,
          padding: '15px 30px',
          background: 'black',
          color: 'white',
          border: 'none',
          borderRadius: 10
        }}>
          Traiter automatiquement les factures
        </button>
      </div>
    </div>
  )
}
