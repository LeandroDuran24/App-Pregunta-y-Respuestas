using BackEnd.Domain.IServices;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BackEnd.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RespuestasCuestionarioController : ControllerBase
    {
        private readonly IRespuestaCuestionarioService _respuestaCuestionarioService;

        public RespuestasCuestionarioController(IRespuestaCuestionarioService respuestaCuestionarioService)
        {
            _respuestaCuestionarioService = respuestaCuestionarioService;
        }
    }
}
