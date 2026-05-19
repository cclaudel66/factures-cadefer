import { useState } from 'react'

export default function App() {
  const [pdfFile, setPdfFile] = useState(null)
  const [excelFile, setExcelFile] = useState(null)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  async function handleProcess() {
    if (!pdfFile || !excelFile) {
      setMessage('Veuillez sélectionner le PDF et le fichier Excel.')
      return
    }

    try {
      setLoading(true)
      setMessage('Traitement des factures en cours...')

      const formData = new FormData()
      formData.append('pdf', pdfFile)
      formData.append('excel', excelFile)

      const response = await fetch('/api/process', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        throw new Error('Erreur pendant le traitement.')
      }

      const blob = await response.blob()

      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = 'factures.zip'
      document.body.appendChild(a)
      a.click()
      a.remove()

      setMessage('ZIP généré avec succès ✅')
    } catch (error) {
      setMessage(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: '#f3f4f6',
      padding: '40px',
      fontFamily: 'Arial'
    }}>
      <div style={{
        maxWidth: '900px',
        margin: '0 auto',
        background: 'white',
        borderRadius: '20px',
        padding: '40px',
        boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
      }}>
        <h1 style={{
          fontSize: '32px',
          marginBottom: '10px'
        }}>
          Automatisation des factures PDF
        </h1>

        <p style={{
          color: '#666',
          marginBottom: '30px'
        }}>
          Déposez votre PDF global et votre fichier Excel.
        </p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '20px',
          marginBottom: '30px'
        }}>
          <div style={{
            border: '2px dashed #ccc',
            borderRadius: '20px',
            padding: '20px',
            background: '#fafafa'
          }}>
            <h2>PDF des factures</h2>

            <input
              type="file"
              accept=".pdf"
              onChange={(e) => setPdfFile(e.target.files[0])}
            />

            {pdfFile && (
              <p style={{ color: 'green' }}>
                {pdfFile.name}
              </p>
            )}
          </div>

          <div style={{
            border: '2px dashed #ccc',
            borderRadius: '20px',
            padding: '20px',
            background: '#fafafa'
          }}>
            <h2>Fichier Excel</h2>

            <input
              type="file"
              accept=".xlsx,.xls"
              onChange={(e) => setExcelFile(e.target.files[0])}
            />

            {excelFile && (
              <p style={{ color: 'green' }}>
                {excelFile.name}
              </p>
            )}
          </div>
        </div>

        <div style={{
          background: '#eff6ff',
          padding: '20px',
          borderRadius: '20px',
          marginBottom: '30px'
        }}>
          <h3>Structure attendue du fichier Excel</h3>

          <ul>
            <li>Colonne A : numéro manuscrit</li>
            <li>Colonne B : fournisseur</li>
            <li>Colonne C : numéro réel de facture</li>
            <li>Feuille : 2026</li>
          </ul>
        </div>

        <button
          onClick={handleProcess}
          disabled={loading}
          style={{
            background: 'black',
            color: 'white',
            padding: '15px 30px',
            borderRadius: '15px',
            border: 'none',
            fontSize: '16px',
            cursor: 'pointer'
          }}
        >
          {loading
            ? 'Traitement en cours...'
            : 'Traiter automatiquement les factures'}
        </button>

        {message && (
          <div style={{
            marginTop: '20px',
            background: '#f3f4f6',
            padding: '15px',
            borderRadius: '10px'
          }}>
            {message}
          </div>
        )}
      </div>
    </div>
  )
}
