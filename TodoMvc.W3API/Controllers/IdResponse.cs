using Newtonsoft.Json;

namespace TodoMvc.W3API.Controllers
{
    public class IdResponse
    {
        [JsonProperty("Id")]
        public long Id { get; set; }

        public IdResponse()
        {
        }

        public IdResponse(long id)
        {
            Id = id;
        }
    }
}