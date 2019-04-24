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

    public class StoreController : Controller
    {
        private readonly OnboardingContext _context;

        public StoreController(OnboardingContext context)
        {
            _context = context;
        }

        [HttpGet("[action]")]
        public List<Store> StoreDisplay()
        {

            var model = _context.Store.ToList();
            return model;

        }

        [HttpPost("[action]")]
        public IActionResult AddStore([FromBody]Store store)
        {


            var model = _context.Store.Where(x => x.Id.Equals(store.Id)).FirstOrDefault();
            if (model == null)
            {
                model = new Store
                {
                    Id = store.Id,
                };

                _context.Entry(model).State = EntityState.Added;
                _context.Store.Add(model);
            }
            model.Name = store.Name;
            model.Address = store.Address;

            _context.SaveChanges();



            return Ok(store);
        }

        [HttpPost("[action]")]
        public IActionResult DeleteStore([FromBody]Store store)
        {

            var model = _context.Store.Where(x => x.Id.Equals(store.Id)).FirstOrDefault();
            if (model != null)
            {
                _context.Entry(model).State = EntityState.Deleted;
                _context.Store.Remove(model);
                _context.SaveChanges();
            }

            return Ok(store);
        }
    }
}