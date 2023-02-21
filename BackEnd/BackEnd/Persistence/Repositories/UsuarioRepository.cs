using BackEnd.Domain.IRepositories;
using BackEnd.Domain.Models;
using BackEnd.Persistence.Context;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Globalization;

namespace BackEnd.Persistence.Repositories
{
    public class UsuarioRepository:IUsuarioRepository
    {
        private readonly AplicationDbContext _context;

        public UsuarioRepository(AplicationDbContext context)
        {
           _context= context;

        }



        public async Task SaveUser( Usuario user)
        {
            _context.Add(user);
            await _context.SaveChangesAsync();
           
        }

        public async Task<bool>ValidateExistence(Usuario usuario)
        {
            var validateExistence = await _context.Usuarios.AnyAsync(x=> x.NombreUsuario == usuario.NombreUsuario);
            return validateExistence;
        }

        public async Task<Usuario> ValidatePassword(int idUsuario,string passwordAnterior)
        {
            var usuario = await _context.Usuarios.Where(x=> x.Id ==idUsuario && x.Password ==passwordAnterior).FirstOrDefaultAsync();

            return usuario;
        }

        public async Task UpdatePassword(Usuario usuario)
        {
             _context.Update(usuario);
            await _context.SaveChangesAsync();  
        }
        
    }
}
