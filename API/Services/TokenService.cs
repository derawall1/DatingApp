using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using API.Entities;
using API.Interfaces;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;

namespace API.Services
{
    public class TokenService : ITokenService
    {
        private readonly SymmetricSecurityKey _key;
        public TokenService(IConfiguration confiq)
        {
            _key= new SymmetricSecurityKey(Encoding.UTF8.GetBytes(confiq["TokenKey"]));
        }
        public string CreateToken(AppUser user)
        {
            // creating claims
            var claims = new List<Claim>(){
                new Claim(JwtRegisteredClaimNames.NameId, user.UserName)
            };
            // create secure signatures 
            var creds = new SigningCredentials(_key,SecurityAlgorithms.HmacSha512Signature);
            // creatin token descriptor
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.Now.AddDays(7),
                SigningCredentials=creds
            };
            // token handler 
            var tokenHandler = new JwtSecurityTokenHandler();
            // creating token 
            var token = tokenHandler.CreateToken(tokenDescriptor);
            // send token 
            return tokenHandler.WriteToken(token);

        }
    }
}