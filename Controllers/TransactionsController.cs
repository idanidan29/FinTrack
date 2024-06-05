using Microsoft.AspNetCore.Mvc;
using MongoDB.Bson;
using System.Collections.Generic;
using System.Threading.Tasks;
using FinTracker.Models;
using FinTracker.Repositories;
using Microsoft.AspNetCore.Cors;

namespace FinTracker.Controllers
{
    [ApiController]
    [Route("[controller]")]
    [EnableCors]
    public class TransactionsController : ControllerBase
    {
        private readonly ITransactionsRepository _Transactionsrepository;
        private readonly IUsersRepository _Usersrepository;

        public TransactionsController(ITransactionsRepository transactionsrepository, IUsersRepository usersrepository)
        {
            _Transactionsrepository = transactionsrepository;
            _Usersrepository = usersrepository;
        }

        // GET: api/transactions
        [HttpGet("{username}")]
        public async Task<ActionResult<IEnumerable<Transaction>>> GetTransactions(string username)
        {
            var transactions = await _Transactionsrepository.GetTransactionsByUsernameAsync(username);

            if (transactions == null || !transactions.Any())
            {
                return NotFound(); // Return a 404 Not Found if no transactions are found for the username
            }

            return Ok(transactions);
        }
        // POST: api/transactions
        [HttpPost]
        public async Task<ActionResult<Transaction>> AddTransaction(Transaction transaction)
        {
            User user = await _Usersrepository.GetByUsernameAsync(transaction.UserUserName);
            if (user == null)
            {return NotFound("User not found.");}

            int monthNumber = transaction.Date.Month;
            int year = transaction.Date.Year;
            Month month = user.MonthlyData.FirstOrDefault(m => m.MonthNumber == monthNumber && m.Year == year);
            if (month == null)
            {
                month = new Month { MonthNumber = monthNumber, Year = year };
                user.MonthlyData.Add(month);
            }

            if (transaction.Category == "Income")
            {
                user.Balance += transaction.Amount;
                month.Income += transaction.Amount;
                month.IncomeTrans?.Add(transaction);
            }
            else if (transaction.Category == "Expenses")
            {
                user.Balance -= transaction.Amount;
                month.Spendings += transaction.Amount;
                month.ExpensesTrans?.Add(transaction);
            }
            month.Balance=user.Balance;
            await _Usersrepository.UpdateAsync(user);
            await _Transactionsrepository.AddTransactionAsync(transaction);
            return CreatedAtAction(nameof(GetTransactions), new { username = transaction.UserUserName }, transaction);
        }

        // PUT: api/transactions/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateTransaction(string id, Transaction updatedTransaction)
        {
            await _Transactionsrepository.UpdateTransactionAsync(id, updatedTransaction);
            return NoContent();
        }

        // DELETE: api/transactions/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTransaction(string id)
        {
            
            string username=await _Transactionsrepository.GetUsernameByTransactionIdAsync(id);
            await _Usersrepository.DeleteTransactionFromUserAsync(username, id);
            await _Transactionsrepository.DeleteTransactionAsync(id);

            return NoContent();
        }
    }
}
