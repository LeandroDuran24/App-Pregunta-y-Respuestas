using BackEnd.Domain.Models;

namespace BackEnd.Domain.IServices
{
    public interface IUsuarioService 
    {
        Task SaveUser(Usuario user);
        Task<bool> ValidateExistence(Usuario usuario);

        Task<Usuario> ValidatePassword(int idUsuario,string passwordAnterior);

        Task UpdatePassword(Usuario usuario);
        

    }
}
