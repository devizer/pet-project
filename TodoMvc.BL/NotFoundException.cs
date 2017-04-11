using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;
using System.Threading.Tasks;

namespace TodoMvc.BL
{
    // An MVC filter should transform this exception into 404 status
    [Serializable]
    public class NotFoundException : Exception
    {
        public static NotFoundException Create(string entityType)
        {
            return new NotFoundException($"Entity of type {entityType} not found");
        }

        public static void Throw(string entityType)
        {
            throw Create(entityType);
        }

        public NotFoundException() : this("Requested entity not found")
        {
        }

        public NotFoundException(string message) : base(message)
        {
        }

        public NotFoundException(string message, Exception innerException) : base(message, innerException)
        {
        }

        protected NotFoundException(SerializationInfo info, StreamingContext context) : base(info, context)
        {
        }
    }
}
