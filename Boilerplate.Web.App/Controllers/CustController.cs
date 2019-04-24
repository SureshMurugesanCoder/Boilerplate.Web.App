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
        [HttpGet("[action]")]
        public List<Customer> CustomerDisplay()
        {
            using (var db = new OnboardingContext())
            {
                var model = db.Customer.ToList();
                return model;
            }
        }

        [HttpPost("[action]")]
        public IActionResult AddCustomer([FromBody]Customer cust)
        {

            using (var db = new OnboardingContext())
            {
                var model = db.Customer.Where(x => x.Id.Equals(cust.Id)).FirstOrDefault();
                if (model == null)
                {
                    model = new Customer
                    {
                        Id = cust.Id,
                    };

                    db.Entry(model).State = EntityState.Added;
                    db.Customer.Add(model);
                }
                model.Name = cust.Name;
                model.Address = cust.Address;

                db.SaveChanges();

            }

            return Ok(cust);
        }

        [HttpPost("[action]")]
        public IActionResult DeleteCustomer([FromBody]Customer cust)
        {
            using (var db = new OnboardingContext())
            {
                var model = db.Customer.Where(x => x.Id.Equals(cust.Id)).FirstOrDefault();
                if (model != null)
                {
                    db.Entry(model).State = EntityState.Deleted;
                    db.Customer.Remove(model);
                    db.SaveChanges();
                }
            }
            return Ok(cust);
        }
    }
}