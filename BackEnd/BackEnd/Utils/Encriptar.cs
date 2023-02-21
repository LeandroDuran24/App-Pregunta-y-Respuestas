using System.Security.Cryptography;
using System.Text;

namespace BackEnd.Utils
{
    public class Encriptar
    {

        public static string EncriptarPassowrd(String input) {
        
         MD5 md5Hash = MD5.Create();

            byte[] data = md5Hash.ComputeHash(Encoding.UTF8.GetBytes(input));
            StringBuilder sBuilder = new StringBuilder();

            for(int i=0;i<data.Length; i++)
            {
                sBuilder.Append(data[i].ToString("x2"));
            }

            return sBuilder.ToString();
        
        
        
        }

    }
}
