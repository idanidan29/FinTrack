using MongoDB.Bson;
using FinTracker.Models;

namespace FinTracker.Models
{
    public class User
    {
        public ObjectId Id { get; set; }
        public string Name { get; set; }
        public string UserName { get; set; }
        public string Password { get; set; }
        public double Balance { get; set; }
        public double Income { get; set; }
        public double Spendings { get; set; }
        public string? CurrencyType { get; set; }

        public DateTime CreatedDate { get; set; }
        public List<Month> MonthlyData { get; set; }
        public User() { 
            CreatedDate = DateTime.Now;
            MonthlyData = new List<Month>();
            Balance = 0;
            Income = 0;
            Spendings = 0;
            Month month = new Month();
            MonthlyData.Add(month);

        }
       

    }
}
public class Month
{
    public int MonthNumber { get; set; } // 1 for January, 2 for February, and so on
    public int Year { get; set; }
    public double Salary { get; set; }
    public double Monthly_expenses { get; set; }
    public double Income { get; set; }
    public double Spendings { get; set; }
    public double Balance { get; set; }
    public List<Transaction>? ExpensesTrans { get; set; }
    public List<Transaction>? IncomeTrans { get; set; }
    public Month()
    {
        ExpensesTrans = new List<Transaction>();
        IncomeTrans = new List<Transaction>();
        MonthNumber = DateTime.Now.Month;
        Year = DateTime.Now.Year;
        Income = 0;
        Spendings = 0;
        Balance = 0;
        Monthly_expenses = 0;
        Salary = 0;
    }
}