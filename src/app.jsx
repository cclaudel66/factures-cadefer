export default function FactureApp() {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-xl p-8">
        <h1 className="text-3xl font-bold mb-2">
          Automatisation des factures PDF
        </h1>

        <p className="text-gray-600 mb-8">
          Importez votre PDF global et votre fichier Excel pour découper automatiquement les factures et les renommer.
        </p>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="border-2 border-dashed rounded-2xl p-6 bg-gray-50">
            <h2 className="text-xl font-semibold mb-4">1. PDF global</h2>
            <input type="file" accept=".pdf" className="w-full" />
            <p className="text-sm text-gray-500 mt-3">
              PDF contenant toutes les factures scannées.
            </p>
          </div>

          <div className="border-2 border-dashed rounded-2xl p-6 bg-gray-50">
            <h2 className="text-xl font-semibold mb-4">2. Fichier Excel</h2>
            <input type="file" accept=".xlsx,.xls" className="w-full" />
            <p className="text-sm text-gray-500 mt-3">
              Feuille attendue : <strong>2026</strong>
            </p>
          </div>
        </div>

        <div className="bg-blue-50 rounded-2xl p-6 mb-8">
          <h3 className="text-lg font-semibold mb-3">Structure attendue du fichier Excel</h3>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-white">
                  <th className="border p-3 text-left">Colonne</th>
                  <th className="border p-3 text-left">Contenu</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border p-3">A</td>
                  <td className="border p-3">Numéro manuscrit sur la facture</td>
                </tr>
                <tr>
                  <td className="border p-3">B</td>
                  <td className="border p-3">Nom du fournisseur</td>
                </tr>
                <tr>
                  <td className="border p-3">C</td>
                  <td className="border p-3">Numéro réel de facture</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div>
            <p className="font-medium">Résultat généré :</p>
            <p className="text-gray-600 text-sm">
              Fournisseur_NumeroFacture.pdf
            </p>
          </div>

          <button className="px-8 py-4 rounded-2xl bg-black text-white font-semibold hover:opacity-90 transition shadow-lg">
            Traiter automatiquement les factures
          </button>
        </div>

        <div className="mt-10 border-t pt-6">
          <h3 className="text-lg font-semibold mb-4">Fonctionnalités du futur outil</h3>

          <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-700">
            <div className="bg-gray-50 rounded-xl p-4">
              ✅ Découpage automatique des PDF
            </div>

            <div className="bg-gray-50 rounded-xl p-4">
              ✅ Renommage intelligent via Excel
            </div>

            <div className="bg-gray-50 rounded-xl p-4">
              🔜 OCR automatique des numéros manuscrits
            </div>

            <div className="bg-gray-50 rounded-xl p-4">
              🔜 Export ZIP automatique
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
