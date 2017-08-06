using System;
using System.Diagnostics;

namespace Newsletter.WebAngular.Util
{
    public class Logging
    {
        public static void LogException(Exception ex)
        {
            Trace.WriteLine("[NewsLetter]" + ex.Message);
            if (ex.InnerException != null)
            {
                LogException(ex.InnerException);
            }
        }
    }
}