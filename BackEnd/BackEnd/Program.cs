using BackEnd.Domain.IRepositories;
using BackEnd.Domain.IServices;
using BackEnd.Persistence.Context;
using BackEnd.Persistence.Repositories;
using BackEnd.Services;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

/*Conexion*/
builder.Services.AddDbContext<AplicationDbContext>(options => options.UseSqlServer(builder.Configuration.GetConnectionString("Conexion")));

/*Servicios*/
builder.Services.AddScoped<IUsuarioService, UsuarioService>();
builder.Services.AddScoped<ILoginService, LoginService>();

/*Repository*/
builder.Services.AddScoped<IUsuarioRepository,UsuarioRepository>();
builder.Services.AddScoped<ILoginRepository, LoginRepository>();


/*CORS*/

builder.Services.AddCors(options => options.AddPolicy("AllowWebApp", builder => builder.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod()));

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}


app.UseCors("AllowWebApp");//CORS

app.UseAuthorization();

app.MapControllers();

app.Run();
