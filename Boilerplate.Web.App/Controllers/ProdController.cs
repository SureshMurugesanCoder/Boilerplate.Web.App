using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Boilerplate.Web.App.Models;
using Microsoft.EntityFrameworkCore;

namespace Boilerplate.Web.App.Controllers
{
    [Route("api/[controller]")]

    public class ProdController : Controller
    {
        [HttpGet("[action]")]
        public List<Product> ProductDisplay()
        {
            using (var db = new OnboardingContext())
            {
                var model = db.Product.ToList();
                return model;
            }
        }

        [HttpPost("[action]")]
        public IActionResult AddProduct([FromBody]Product prod)
        {

            using (var db = new OnboardingContext())
            {
                var model = db.Product.Where(x => x.Id.Equals(prod.Id)).FirstOrDefault();
                if (model == null)
                {
                    model = new Product
                    {
                        Id = prod.Id,
                    };

                    db.Entry(model).State = EntityState.Added;
                    db.Product.Add(model);
                }
                model.Name = prod.Name;
                model.Price = prod.Price;

                db.SaveChanges();

            }

            return Ok(prod);
        }

        [HttpPost("[action]")]
        public IActionResult DeleteProduct([FromBody]Product prod)
        {
            using (var db = new OnboardingContext())
            {
                var model = db.Product.Where(x => x.Id.Equals(prod.Id)).FirstOrDefault();
                if (model != null)
                {
                    db.Entry(model).State = EntityState.Deleted;
                    db.Product.Remove(model);
                    db.SaveChanges();
                }
            }
            return Ok(prod);
        }
    }
}