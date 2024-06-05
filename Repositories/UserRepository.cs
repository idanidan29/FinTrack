using MongoDB.Bson;
using MongoDB.Driver;
using FinTracker.Models;

namespace FinTracker.Repositories
{
    public class UsersRepository : IUsersRepository
    {
        private readonly IMongoCollection<User> _collection;
        public UsersRepository(string connectionString, string databaseName, string collectionName)
        {

            var client = new MongoClient(connectionString);
            var database = client.GetDatabase(databaseName);
            _collection = database.GetCollection<User>(collectionName);
        }
        public async Task<User> CreateAsync(User user)
        {
            await _collection.InsertOneAsync(user);
            return user;
        }
        public async Task<User> GetByIdAsync(string id)
        {
            var objectId = ObjectId.Parse(id);
            return await _collection.Find(user => user.Id == objectId).FirstOrDefaultAsync();
        }
        public async Task<User> GetByUsernameAsync(string username)
        {
            return await _collection.Find(user => user.UserName == username).FirstOrDefaultAsync();
        }
        public async Task<bool> CheckUserExists(string username, string password)
        {
            var user = await _collection.Find(u => u.UserName == username && u.Password == password).FirstOrDefaultAsync();

            return user != null;
        }
        public async Task<User> UpdateAsync(User user)
        {
            var filter = Builders<User>.Filter.Eq(u => u.Id, user.Id);
            var update = Builders<User>.Update
                .Set(u => u.Name, user.Name)
                .Set(u => u.UserName, user.UserName)
                .Set(u => u.Password, user.Password)
                .Set(u => u.Balance, user.Balance)
                .Set(u => u.Income, user.Income)
                .Set(u => u.Spendings, user.Spendings)
                .Set(u => u.MonthlyData, user.MonthlyData);

            await _collection.UpdateOneAsync(filter, update);

            return user;
        }
        public async Task DeleteAsync(User user)
        {
            var filter = Builders<User>.Filter.Eq(u => u.Id, user.Id);
            await _collection.DeleteOneAsync(filter);
        }
        public async Task<bool> DeleteTransactionFromUserAsync(string username, string transactionId)
        {
            var user = await GetByUsernameAsync(username);
            if (user == null)
            {
                return false;
            }

            bool transactionFound = false;

            foreach (var month in user.MonthlyData)
            {
                if (month.ExpensesTrans.RemoveAll(t => t.ClientId == transactionId) > 0 ||
                    month.IncomeTrans.RemoveAll(t => t.ClientId == transactionId) > 0)
                {
                    transactionFound = true;
                }
            }
            if (transactionFound)
            {
                await UpdateAsync(user);
            }

            return transactionFound;
        }

    }
}

