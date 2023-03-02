using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BackEnd.Migrations
{
    /// <inheritdoc />
    public partial class v12 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "RespuestasCuestionarios",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Participante = table.Column<string>(type: "varchar(100)", nullable: false),
                    Fecha = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Activo = table.Column<int>(type: "int", nullable: false),
                    CuestionarioId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RespuestasCuestionarios", x => x.Id);
                    table.ForeignKey(
                        name: "FK_RespuestasCuestionarios_Cuestionarios_CuestionarioId",
                        column: x => x.CuestionarioId,
                        principalTable: "Cuestionarios",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "RespuestasCuestionariosDetalle",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    RespuestaCuestionarioId = table.Column<int>(type: "int", nullable: false),
                    RespuestaId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RespuestasCuestionariosDetalle", x => x.Id);
                    table.ForeignKey(
                        name: "FK_RespuestasCuestionariosDetalle_RespuestasCuestionarios_RespuestaCuestionarioId",
                        column: x => x.RespuestaCuestionarioId,
                        principalTable: "RespuestasCuestionarios",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.NoAction);
                    table.ForeignKey(
                        name: "FK_RespuestasCuestionariosDetalle_Respuestas_RespuestaId",
                        column: x => x.RespuestaId,
                        principalTable: "Respuestas",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.NoAction);
                });

            migrationBuilder.CreateIndex(
                name: "IX_RespuestasCuestionarios_CuestionarioId",
                table: "RespuestasCuestionarios",
                column: "CuestionarioId");

            migrationBuilder.CreateIndex(
                name: "IX_RespuestasCuestionariosDetalle_RespuestaCuestionarioId",
                table: "RespuestasCuestionariosDetalle",
                column: "RespuestaCuestionarioId");

            migrationBuilder.CreateIndex(
                name: "IX_RespuestasCuestionariosDetalle_RespuestaId",
                table: "RespuestasCuestionariosDetalle",
                column: "RespuestaId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "RespuestasCuestionariosDetalle");

            migrationBuilder.DropTable(
                name: "RespuestasCuestionarios");
        }
    }
}
