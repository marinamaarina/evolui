/**
 * Stub do serviço de análise de vídeo (postura, braçada, amplitude etc.).
 * Mesmo racional do imageAnalysisService: existe só como ponto de extensão.
 */

export type VideoAnalysisResult = {
  score: number | null;
  feedback: string;
  strengths: string[];
  improvements: string[];
};

export async function analyzeVideo(
  _storagePath: string
): Promise<VideoAnalysisResult> {
  return {
    score: null,
    feedback: "Análise de vídeo ainda não disponível nesta versão do EVOLUI.",
    strengths: [],
    improvements: [],
  };
}
