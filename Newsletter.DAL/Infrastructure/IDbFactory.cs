using System;

namespace Newsletter.DAL.Infrastructure
{
    public interface IDbFactory : IDisposable
    {
        NewsletterContext Init();
    }
}
