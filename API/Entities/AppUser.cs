using System;
using System.Collections.Generic;
using API.Extensions;

namespace API.Entities
{
    public class AppUser
    {
        public int Id { get; set; }
        public string UserName { get; set; }     
        public byte[]  PasswordHash { get; set; }     
        public byte[] PasswordSalt { get; set; }    
        public DateTime DateOfBirth { get; set; }
        public string KnownAs { get; set; }
        public DateTime CreatedDate { get; set; }=DateTime.Now;
        public DateTime LastActiveDate { get; set; }    =DateTime.Now;
        public string Gender { get; set; }
        public string Introduction { get; set; }
        public string LookingFor { get; set; }
        public string Interests { get; set; }
        public string City { get; set; }
        public string Country { get; set; }
        public ICollection<Photo> Photos { get; set; }

        // the list of users who liked the current user: i.eg. following
        public ICollection<UserLike> LikedByUsers { get; set; }
        // the list of users that has liked by current users i.eg. followers
        public ICollection<UserLike> LikedUsers { get; set; }


    }
}