using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FightNight.Migrations
{
    public partial class multiplefiles : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Pic",
                table: "Characters");

            migrationBuilder.AddColumn<string[]>(
                name: "Pics",
                table: "Characters",
                type: "text[]",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Pics",
                table: "Characters");

            migrationBuilder.AddColumn<string>(
                name: "Pic",
                table: "Characters",
                type: "text",
                nullable: true);
        }
    }
}
