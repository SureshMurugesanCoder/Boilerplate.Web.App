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

    public class SalesController : Controller
    {
        private readonly OnboardingContext _context;

        public SalesController(OnboardingContext context)
        {
            _context = context;
        }

        [HttpGet("[action]")]
        public List<SalesDtc> SalesDisplay()
        {

            var model = _context.Sales.Select(x => new SalesDtc()
            {
                CustomerId = x.Customer.Id,
                CustomerName = x.Customer.Name,
                ProductId = x.Product.Id,
                ProductName = x.Product.Name,
                StoreId = x.Store.Id,
                StoreName = x.Store.Name,
                SalesId = x.Id,
                SalesDateSold = x.DateSold
            }).ToList();
            return model;

        }

        [HttpPost("[action]")]
        public IActionResult AddSales([FromBody]SalesRequestDtc sale)
        {


            var model = _context.Sales.Where(x => x.Id.Equals(sale.Id)).FirstOrDefault();
            if (model == null)
            {
                model = new Sales
                {
                    Id = sale.Id,
                };

                _context.Entry(model).State = EntityState.Added;
                _context.Sales.Add(model);
            }
            model.ProductId = sale.ProductId;
            model.CustomerId = sale.CustomerId;
            model.StoreId = sale.StoreId;
            model.DateSold = sale.SalesDateSold;

            _context.SaveChanges();



            return Ok(sale);
        }

        [HttpPost("[action]")]
        public IActionResult DeleteSales([FromBody]Sales sale)
        {

            var model = _context.Sales.Where(x => x.Id.Equals(sale.Id)).FirstOrDefault();
            if (model != null)
            {
                _context.Entry(model).State = EntityState.Deleted;
                _context.Sales.Remove(model);
                _context.SaveChanges();
            }

            return Ok();


        }

        public class SalesRequestDtc
        {
            public int CustomerId { get; set; }
            public int ProductId { get; set; }
            public int StoreId { get; set; }
            public DateTime SalesDateSold { get; set; }
            public int Id { get; set; }
        }

        public class SalesDtc
        {
            public string CustomerName { get; set; }
            public string ProductName { get; set; }
            public string StoreName { get; set; }
            public int SalesId { get; set; }
            public DateTime SalesDateSold { get; set; }
            public int CustomerId { get; set; }
            public int ProductId { get; set; }
            public int StoreId { get; set; }
        }
    }
}