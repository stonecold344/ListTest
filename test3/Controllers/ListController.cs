using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using test3.Models;

namespace test3.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ListController : ControllerBase
    {
        //private readonly ILogger<ListController> _logger;

        //public ListController(ILogger<ListController> logger)
        //{
            //_logger = logger;
        //}

        [HttpGet]
        public List<ListItem> Get()
        {
            /*return Enumerable.Range(1, 5).Select(index => new ListItem
            {
                Id = index,
                Title = "asdfd",
                Image = "asdfasdfasdff"
            })
            .ToArray();*/
            using var webClient = new WebClient();
            //Get a string represntation of our Json
            string rawJson = webClient.DownloadString(@"C:\Users\stone\source\repos\test3\test3\Data\data.json");
            //Convert the json string to a series of objects
            List<ListItem> list = JsonConvert.DeserializeObject<List<ListItem>>(rawJson);
            //Do some computation
            Console.WriteLine(list);
            return list;
        }

        [HttpPost]
        //Add todolist item
        public ListItem Post([FromBody] ListItem data)
        {
            using var webClient = new WebClient();
            //Get a string represntation of our Json
            string rawJson = webClient.DownloadString(@"C:\Users\stone\source\repos\test3\test3\Data\data.json");
            //Convert the json string to a series of objects
            List<ListItem> list = JsonConvert.DeserializeObject<List<ListItem>>(rawJson) ?? new List<ListItem>();
            //List<ListItem> _data = new()
            //{
            list.Add(new ListItem
            {
                Id = data.Id,
                Title = data.Title,
                Image = data.Image,
            });
            //};
            string json = JsonConvert.SerializeObject(list);
            Console.WriteLine(json);
            //write string to file
            System.IO.File.WriteAllText(@"C:\Users\stone\source\repos\test3\test3\Data\data.json", json);
            return data;
        }
    }
}
