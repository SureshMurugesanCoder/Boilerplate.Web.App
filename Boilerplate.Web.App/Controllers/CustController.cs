using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Boilerplate.Web.App.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Boilerplate.Web.App.Controllers
{

    [Route("api/[controller]")]

    public class CustController : Controller
    {
        private readonly OnboardingContext _context;

        public CustController(OnboardingContext context)
        {
            _context = context;
        }

        [HttpGet("[action]")]
        public List<Customer> CustomerDisplay()
        {

            var model = _context.Customer.ToList();
            return model;

        }

        [HttpPost("[action]")]
        public IActionResult AddCustomer([FromBody]Customer cust)
        {
            var model = _context.Customer.Where(x => x.Id.Equals(cust.Id)).FirstOrDefault();
            if (model == null)
            {
                model = new Customer
                {
                    Id = cust.Id,
                };

                _context.Entry(model).State = EntityState.Added;
                _context.Customer.Add(model);
            }
            model.Name = cust.Name;
            model.Address = cust.Address;

            _context.SaveChanges();
            return Ok(cust);
        }

        [HttpPost("[action]")]
        public IActionResult DeleteCustomer([FromBody]Customer cust)
        {

            var model = _context.Customer.Where(x => x.Id.Equals(cust.Id)).FirstOrDefault();
            if (model != null)
            {
                _context.Entry(model).State = EntityState.Deleted;
                _context.Customer.Remove(model);
                _context.SaveChanges();
            }

            return Ok(cust);
        }
    }
}