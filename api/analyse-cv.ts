// /api/analyse-cv.ts

import type { VercelRequest, VercelResponse } from '@vercel/node';

export default function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === 'POST') {
    const { contenuCV } = req.body;

    if (!contenuCV || typeof contenuCV !== 'string') {
      return res.status(400).json({ erreur: 'Contenu du CV manquant ou invalide' });
    }

    // Exemple d’analyse simple (à personnaliser selon ton projet)
    const competences = ['Python', 'JavaScript', 'React', 'Node.js'];
    const resultat: string[] = [];

    for (const skill of competences) {
      if (contenuCV.toLowerCase().includes(skill.toLowerCase())) {
        resultat.push(skill);
      }
    }

    return res.status(200).json({ competencesTrouvées: resultat });
  }

  // Si ce n’est pas un POST
  res.status(405).json({ erreur: 'Méthode non autorisée' });
}
