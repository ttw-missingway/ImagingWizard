using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FightNight.Migrations
{
    public partial class picUpdate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "ELO",
                table: "Characters",
                type: "integer",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Pic",
                table: "Characters",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Secondary",
                table: "Characters",
                type: "text",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ELO",
                table: "Characters");

            migrationBuilder.DropColumn(
                name: "Pic",
                table: "Characters");

            migrationBuilder.DropColumn(
                name: "Secondary",
                table: "Characters");
        }
    }
}
