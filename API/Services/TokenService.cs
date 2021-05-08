using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using API.Entities;
using API.Interfaces;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;

namespace API.Services
{
    public class TokenService : ITokenService
    {
        private readonly SymmetricSecurityKey _key;
        private readonly UserManager<AppUser> _userManager;

        public TokenService(IConfiguration confiq, UserManager<AppUser> userManager)
        {
            _key= new SymmetricSecurityKey(Encoding.UTF8.GetBytes(confiq["TokenKey"]));
            _userManager = userManager;
        }
        public async Task<string> CreateToken(AppUser user)
        {
            // creating claims
            var claims = new List<Claim>(){
                new Claim(JwtRegisteredClaimNames.UniqueName, user.UserName),
                new Claim(JwtRegisteredClaimNames.NameId, user.Id.ToString()),
                new Claim(JwtRegisteredClaimNames.GivenName, user.KnownAs == null ? user.UserName : user.KnownAs)
            };
            // getting roles adding to claims
            var roles = await _userManager.GetRolesAsync(user);

            claims.AddRange(roles.Select(role => new Claim(ClaimTypes.Role, role)));
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