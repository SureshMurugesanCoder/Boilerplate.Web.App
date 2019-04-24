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
        [HttpGet("[action]")]
        public List<Store> StoreDisplay()
        {
            using (var db = new OnboardingContext())
            {
                var model = db.Store.ToList();
                return model;
            }
        }

        [HttpPost("[action]")]
        public IActionResult AddStore([FromBody]Store store)
        {

            using (var db = new OnboardingContext())
            {
                var model = db.Store.Where(x => x.Id.Equals(store.Id)).FirstOrDefault();
                if (model == null)
                {
                    model = new Store
                    {
                        Id = store.Id,
                    };

                    db.Entry(model).State = EntityState.Added;
                    db.Store.Add(model);
                }
                model.Name = store.Name;
                model.Address = store.Address;

                db.SaveChanges();

            }

            return Ok(store);
        }

        [HttpPost("[action]")]
        public IActionResult DeleteStore([FromBody]Store store)
        {
            using (var db = new OnboardingContext())
            {
                var model = db.Store.Where(x => x.Id.Equals(store.Id)).FirstOrDefault();
                if (model != null)
                {
                    db.Entry(model).State = EntityState.Deleted;
                    db.Store.Remove(model);
                    db.SaveChanges();
                }
            }
            return Ok(store);
        }
    }
}