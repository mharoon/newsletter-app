using System.Collections.Generic;
using Newsletter.Models.DTO;

namespace Newsletter.Service
{
    public interface ISourceTypeService
    {
        IEnumerable<SourceTypeEntitiy> GetSourceTypes();
        void CreateSource(SourceTypeEntitiy source);
        void SaveSource();
    }
}
