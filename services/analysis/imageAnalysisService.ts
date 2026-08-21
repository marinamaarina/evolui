/**
 * Stub do serviço de análise de imagem.
 *
 * Hoje não faz nenhuma análise de verdade — existe só para a arquitetura já
 * ter o "encaixe" pronto para quando a visão computacional entrar (fora do
 * MVP). Nenhuma tela chama isso ainda.
 *
 * IMPORTANTE (regra de produto): quando a análise real existir, o resultado
 * é sempre feedback informativo/comparativo — nunca um diagnóstico médico
 * nem uma medição corporal com alegação de precisão clínica.
 */

export type ImageAnalysisResult = {
  score: number | null;
  feedback: string;
  strengths: string[];
  improvements: string[];
};

export async function analyzeImage(
  _storagePath: string
): Promise<ImageAnalysisResult> {
  return {
    score: null,
    feedback: "Análise de imagem ainda não disponível nesta versão do EVOLUI.",
    strengths: [],
    improvements: [],
  };
}
