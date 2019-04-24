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
        private readonly OnboardingContext _context;

        public ProdController(OnboardingContext context)
        {
            _context = context;
        }

        [HttpGet("[action]")]
        public List<Product> ProductDisplay()
        {

            var model = _context.Product.ToList();
            return model;
        }

        [HttpPost("[action]")]
        public IActionResult AddProduct([FromBody]Product prod)
        {


            var model = _context.Product.Where(x => x.Id.Equals(prod.Id)).FirstOrDefault();
            if (model == null)
            {
                model = new Product
                {
                    Id = prod.Id,
                };

                _context.Entry(model).State = EntityState.Added;
                _context.Product.Add(model);
            }
            model.Name = prod.Name;
            model.Price = prod.Price;

            _context.SaveChanges();



            return Ok(prod);
        }

        [HttpPost("[action]")]
        public IActionResult DeleteProduct([FromBody]Product prod)
        {

            var model = _context.Product.Where(x => x.Id.Equals(prod.Id)).FirstOrDefault();
            if (model != null)
            {
                _context.Entry(model).State = EntityState.Deleted;
                _context.Product.Remove(model);
                _context.SaveChanges();
            }

            return Ok(prod);
        }
    }
}