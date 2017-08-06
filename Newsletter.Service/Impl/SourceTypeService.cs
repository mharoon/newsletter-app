using System.Collections.Generic;
using Newsletter.Models.DTO;
using Newsletter.DAL.Repositories;
using Newsletter.DAL.Infrastructure;

namespace Newsletter.Service
{
    public class SourceTypeService : ISourceTypeService
    {
        private readonly ISourceTypeRepository SourceTypeRepository;
        private readonly IUnitOfWork unitOfWork;

        public SourceTypeService(ISourceTypeRepository SourceTypeRepository, IUnitOfWork unitOfWork)
        {
            this.SourceTypeRepository = SourceTypeRepository;

            this.unitOfWork = unitOfWork;
        }

        public void CreateSource(SourceTypeEntitiy source)
        {
            SourceTypeRepository.Add(source);
        }

        public IEnumerable<SourceTypeEntitiy> GetSourceTypes()
        {
            var sourceTypes = SourceTypeRepository.GetAll();
            return sourceTypes;
        }

        public void SaveSource()
        {
            unitOfWork.Commit();
        }
    }
}
