namespace Newsletter.DAL.Infrastructure
{
    public class DbFactory : Disposable, IDbFactory
    {
        NewsletterContext dbContext;

        public NewsletterContext Init()
        {
            return dbContext ?? (dbContext = new NewsletterContext());
        }

        protected override void DisposeCore()
        {
            if (dbContext != null)
                dbContext.Dispose();
        }
    }
}
