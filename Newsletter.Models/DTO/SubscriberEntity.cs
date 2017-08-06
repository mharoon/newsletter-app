using System;

namespace Newsletter.Models.DTO
{
    public class SubscriberEntity
    {
        public int Id { get; set; }
        public int SourceID { get; set; }
        public string Email { get; set; }
        public string Reason { get; set; }
        public DateTime CreationDate { get; set; }
        public Boolean IsActive { get; set; }

        public virtual SourceTypeEntitiy SourceType { get; set; }
    }
}
