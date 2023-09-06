export default function formatarData(data) {
  if (!data) {
      return ""; // ou algum valor padrão ou até mesmo lançar um erro
  }
  const [ano, mes, dia] = data.split("-");
  return `${dia}/${mes}/${ano}`;
}