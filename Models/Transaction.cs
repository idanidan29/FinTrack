using MongoDB.Bson;
using System;

namespace FinTracker.Models
{
    public class Transaction
    {
        public ObjectId Id { get; set; }
        public string ClientId { get; set; } // Changed property name to follow C# naming conventions
        public double Amount { get; set; }
        public string Category { get; set; } // Removed nullable annotation since Category should not be null
        public DateTime Date { get; set; }
        public string Description { get; set; } // Removed nullable annotation since Description should not be null
        public string UserUserName { get; set; }

        public Transaction()
        {
            Date = DateTime.UtcNow;
            ClientId = GenerateRandomId(10); // Generate a random ID for ClientId
        }

        private string GenerateRandomId(int length)
        {
            const string characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
            Random random = new Random();
            string result = "";
            for (int i = 0; i < length; i++)
            {
                int randomIndex = random.Next(characters.Length);
                result += characters[randomIndex];
            }
            return result;
        }
    }
}
