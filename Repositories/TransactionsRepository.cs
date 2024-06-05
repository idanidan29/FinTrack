using MongoDB.Bson;
using MongoDB.Driver;
using System.Collections.Generic;
using System.Threading.Tasks;
using FinTracker.Models;
using MongoDB.Driver.Core.Configuration;
using System.Collections;

namespace FinTracker.Repositories
{
    public class TransactionsRepository : ITransactionsRepository
    {
        private readonly IMongoCollection<Transaction> _collection;

        public TransactionsRepository(string connectionString, string databaseName, string collectionName)
        {
            var client = new MongoClient(connectionString);
            var database = client.GetDatabase(databaseName);
            _collection = database.GetCollection<Transaction>(collectionName);
        }
        public async Task<IEnumerable<Transaction>> GetTransactionsByUsernameAsync(string username)
        {
            var transactions = await _collection.Find(t => t.UserUserName == username).ToListAsync();
            return transactions;
        }
        public async Task<List<Transaction>> GetAllTransactionsAsync()
        {
            return await _collection.Find(_ => true).ToListAsync();
        }

        public async Task<Transaction> GetTransactionByIdAsync(string id)
        {
            return await _collection.Find(t => t.Id == new ObjectId(id)).FirstOrDefaultAsync();
        }

        public async Task AddTransactionAsync(Transaction transaction)
        {
            await _collection.InsertOneAsync(transaction);
        }

        public async Task UpdateTransactionAsync(string id, Transaction updatedTransaction)
        {
            await _collection.ReplaceOneAsync(t => t.Id == new ObjectId(id), updatedTransaction);
        }

        public async Task DeleteTransactionAsync(string id)
        {
            
            await _collection.DeleteOneAsync(t => t.ClientId == id);

        }
        public async Task<string> GetUsernameByTransactionIdAsync(string transactionId)
        {
            var transaction = await _collection.Find(t => t.ClientId == transactionId).FirstOrDefaultAsync();
            if (transaction != null)
            {
                return transaction.UserUserName;
            }
            return null; // Or throw an exception if transaction not found
        }
    }
}
