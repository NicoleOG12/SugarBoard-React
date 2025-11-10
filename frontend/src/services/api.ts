export const API_URL = "/api/doces";

export async function getProdutos() {
  const res = await fetch(API_URL);
  return res.json();
}

export async function getCategorias() {
  const res = await fetch(`${API_URL}/categorias`);
  return res.json();
}

export async function salvarProduto(formData: FormData, editando?: number) {
  const method = editando ? "PUT" : "POST";
  const url = editando ? `${API_URL}/${editando}` : API_URL;

  await fetch(url, { method, body: formData });
}

export async function deletarProduto(id: number) {
  await fetch(`${API_URL}/${id}`, { method: "DELETE" });
}
