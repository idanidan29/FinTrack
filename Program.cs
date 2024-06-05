using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using MongoDB.Driver;
using FinTracker.Models;
using FinTracker.Repositories;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll",
        builder =>
        {
            builder.AllowAnyOrigin()
                   .AllowAnyMethod()
                   .AllowAnyHeader();
        });
});

// MongoDB configuration
string connectionstring = "mongodb://localhost:27017";
string database = "trivia_game"; // Adjust the database name
string usersCollectionName = "users"; // Collection for user data
string transactionsCollectionName = "transactions"; // Collection for transactions

var client = new MongoClient(connectionstring);
var db = client.GetDatabase(database);
var usersCollection = db.GetCollection<User>(usersCollectionName);
var transactionsCollection = db.GetCollection<Transaction>(transactionsCollectionName);

// Register repositories and services
builder.Services.AddSingleton<IUsersRepository>(new UsersRepository(connectionstring, database, usersCollectionName));
builder.Services.AddSingleton<ITransactionsRepository>(new TransactionsRepository(connectionstring, database, transactionsCollectionName));

var app = builder.Build();

// Configure the HTTP request pipeline
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseRouting();
app.UseCors("AllowAll");
app.UseAuthorization();
app.MapControllers();

app.Run();