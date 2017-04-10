using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TodoMvc.BL
{

    public class TodoList
    {
        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public long Id { get; set; }
        public string Title { get; set; }

        [InverseProperty("List")]
        public virtual ICollection<TodoTask> Tasks { get; set; }
    }

    public enum TaskStatus
    {
        All,
        Completed,
        Active
    }
}
