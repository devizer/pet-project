using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Newtonsoft.Json;

namespace TodoMvc.BL
{
    public class TodoTask
    {
        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public long Id { get; set; }

        [Required]
        public string Title { get; set; }

        public bool Completed { get; set; }

        [Required, ForeignKey("List")]
        public long IdList { get; set; }

        [JsonIgnore]
        public TodoList List { get; set; }
    }
}