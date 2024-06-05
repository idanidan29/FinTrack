using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using FinTracker.Models;
using FinTracker.Repositories;
using System.Transactions;

namespace TRIVIA_CHAMPIONSHIP.Controllers
{
    [ApiController]
    [Route("[controller]")]
    [EnableCors]
    public class UsersController : ControllerBase
    {
        private readonly IUsersRepository _repository;
        public UsersController(IUsersRepository repository)
        {
            _repository = repository;
        }

        [HttpPost]
        public async Task<IActionResult> Create(User user)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var existingUser = await _repository.GetByUsernameAsync(user.UserName);
            if (existingUser != null)
            {
                ModelState.AddModelError("Username", "Username is already taken");
                return Conflict(ModelState); // returns 409 to send the correct error
            }

            await _repository.CreateAsync(user);

            // Return 201 Created status with the location of the new resource
            return CreatedAtAction(nameof(Create), new { id = user.Id }, user);
        }
        [HttpGet]
        public async Task<IActionResult> CheckUserExists([FromQuery] string username, [FromQuery] string password)
        {
            // Use the repository function to check if a user with the provided username and password exists
            var userExists = await _repository.CheckUserExists(username, password);

            if (userExists)
            {
                // Return a success status (200 OK) if the user exists
                User user=await _repository.GetByUsernameAsync(username);
                return Ok(user);
            }
            else
            {
                // Return a not found status (404 Not Found) if the user does not exist
                return NotFound(new { Message = "User not found." });
            }
        }
        [HttpGet("{username}")]
        public async Task<IActionResult> GetByUsername(string username)
        {
            var user = await _repository.GetByUsernameAsync(username);
            if (user == null)
            {
                return NotFound();
            }
            return Ok(user);
        }

        [HttpPut]
        public async Task<IActionResult> UpdateUser(User userData)
        {
            try
            {
                var existingUser = await _repository.GetByUsernameAsync(userData.UserName);
                if (existingUser == null)
                {
                    return NotFound("User not found");
                }
                int monthNumber = DateTime.UtcNow.Month;
                int year = DateTime.UtcNow.Year;
                Month month = existingUser.MonthlyData.FirstOrDefault(m => m.MonthNumber == monthNumber && m.Year == year);
                if (month == null)
                {
                    month = new Month { MonthNumber = monthNumber, Year = year };
                    existingUser.MonthlyData.Add(month);
                }
                
                existingUser.Name = userData.Name;
                existingUser.Balance = userData.Balance;
                existingUser.Income = userData.Income;
                existingUser.Spendings = userData.Spendings;

                month.Salary = userData.Income;
                month.Balance = userData.Balance;
                month.Monthly_expenses = userData.Spendings;

                await _repository.UpdateAsync(existingUser);

                return Ok("User updated successfully");
            }
            catch (Exception ex)
            {
                return StatusCode(500, "An error occurred while updating the user");
            }
        }
        [HttpDelete("{username}")]
        public async Task<IActionResult> DeleteUser(string username)
        {
            try
            {
                var userToDelete = await _repository.GetByUsernameAsync(username);
                if (userToDelete == null)
                {
                    return NotFound("User not found");
                }

                await _repository.DeleteAsync(userToDelete); // Assuming your repository has an async Delete method

                return Ok("User deleted successfully");
            }
            catch (Exception ex)
            {
                return StatusCode(500, "An error occurred while deleting the user");
            }
        }




    }
}
