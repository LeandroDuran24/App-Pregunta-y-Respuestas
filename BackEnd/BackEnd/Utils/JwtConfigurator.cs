using BackEnd.Domain.Models;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace BackEnd.Utils
{
    public class JwtConfigurator
    {
        public static string GetToken(Usuario user, IConfiguration config)
        {
            string secretKey = config["Jwt:SecretKey"];
            string issuer = config["Jwt:Issuer"];
            string audience = config["Jwt:Audience"];

            var security = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secretKey));
            var credentials = new SigningCredentials(security, SecurityAlgorithms.HmacSha256);

            var claims = new[]
            {
                new Claim(JwtRegisteredClaimNames.Sub,user.NombreUsuario),
             new Claim("idUsuario", user.Id.ToString())
            };


            var token = new JwtSecurityToken(
                issuer: issuer,
                audience: audience,
                claims,
                expires: DateTime.Now.AddMinutes(60),
                signingCredentials: credentials

                );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        public static int GetTokenIdUsuario(ClaimsIdentity identity )
        {
            if(identity != null) { 
            
                IEnumerable<Claim> claims = identity.Claims;
                foreach(var claim in claims)
                {
                    if(claim.Type == "idUsuario")
                    {
                        return int.Parse(claim.Value);
                    }

                }
            }
            return 0;

        }

    }
}
