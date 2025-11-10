import pool from "../config/bd";

export interface Doce {
  id?: number;
  nome: string;
  subtitulo?: string;
  valor: number;
  peso?: string;
  imagem?: string;
  estoque?: number;
  categoria_id?: number | null;
  categoria_nome?: string;
}

class DocesDAO {
  async listar(): Promise<Doce[]> {
    const [rows] = await pool.query(`
      SELECT 
        d.id,
        d.nome,
        d.subtitulo,
        d.valor,
        d.peso,
        d.imagem,
        d.estoque,
        c.nome AS categoria_nome
      FROM doces d
      LEFT JOIN categorias c ON d.categoria_id = c.id
      ORDER BY d.id DESC
    `);
    return rows as Doce[];
  }

  async buscarPorId(id: number): Promise<Doce | null> {
    const [rows] = await pool.query(`
      SELECT 
        d.id,
        d.nome,
        d.subtitulo,
        d.valor,
        d.peso,
        d.imagem,
        d.estoque,
        c.nome AS categoria_nome
      FROM doces d
      LEFT JOIN categorias c ON d.categoria_id = c.id
      WHERE d.id = ?
    `, [id]);
    
    const results = rows as Doce[];
    return results.length > 0 ? results[0] : null;
  }

  async criar(dados: Doce): Promise<Doce> {
    const { nome, subtitulo, valor, peso, imagem, estoque, categoria_id } = dados;
    const [result]: any = await pool.query(`
      INSERT INTO doces (nome, subtitulo, valor, peso, imagem, estoque, categoria_id)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `, [nome, subtitulo, valor, peso, imagem, estoque, categoria_id]);
    
    return { id: result.insertId, ...dados };
  }

  async atualizar(id: number, dados: Doce): Promise<boolean> {
    const { nome, subtitulo, valor, peso, imagem, estoque, categoria_id } = dados;
    const [result]: any = await pool.query(`
      UPDATE doces
      SET nome = ?, subtitulo = ?, valor = ?, peso = ?, imagem = ?, estoque = ?, categoria_id = ?
      WHERE id = ?
    `, [nome, subtitulo, valor, peso, imagem, estoque, categoria_id, id]);
    
    return result.affectedRows > 0;
  }

  async deletar(id: number): Promise<boolean> {
    const [result]: any = await pool.query(`DELETE FROM doces WHERE id = ?`, [id]);
    return result.affectedRows > 0;
  }
}

export default new DocesDAO();
