using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion.Internal;
using System.Web.Http.Cors;
using WebApi_Angular_Proj.DTO;
using WebApi_Angular_Proj.Repository;

namespace WebApi_Angular_Proj.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [EnableCors(origins: "https://localhost:4200/", headers: "*", methods: "*")]
    public class FrindController : ControllerBase
    {
        IFrindRequestRepository FrindRequest;
        public FrindController(IFrindRequestRepository _frindRequestRepository)
        {
            FrindRequest = _frindRequestRepository;
        }
        [HttpPost("SendRequset")]
        public IActionResult SendRequest(RequestDTO request)
        {

            FrindRequest.SendRequest(request);
            return Ok();
        }

        [HttpPost("Accept")]
        public IActionResult AcceptRequest(RequestDTO requestDTO)
        {
            FrindRequest.AcceptRequest(requestDTO.FromId, requestDTO.ToId);
            return Ok();
        }

        [HttpPost("Reject")]
        public IActionResult RejectRequest(RequestDTO requestDTO)
        {
            FrindRequest.RejectRequest(requestDTO.FromId, requestDTO.ToId);
            return Ok();
        }

        [HttpGet("ToId")]
        public IActionResult GetRequest(string ToId)
        {
            return Ok(FrindRequest.GetAllRequests(ToId));
        }


        [HttpGet("NewRequest")]
        public int GetNewRequests(string Id)
        {
            return (FrindRequest.GetNewRequestCount(Id));
        }
        [HttpGet("CheckFrind")]
        public bool CheckFrind(string FromId, string ToId)
        {
            return FrindRequest.CheckFrind(FromId, ToId);

        }

        [HttpGet("CheckReject")]
        public bool CheckReject(string FromId, string ToId)
        {
            return FrindRequest.CheckRejectRequest(FromId, ToId);

        }
        [HttpGet("CheckPendding")]
        public bool CheckPending(string FromId, string ToId)
        {
            return FrindRequest.CheckPenddingRequest(FromId, ToId);

        }

        [HttpPost("CancelRequest")]
        public IActionResult CancelRequest(RequestDTO req)
        {
            FrindRequest.CancelRequest(req.FromId, req.ToId);
            return Ok();

        }

        [HttpGet("GetFriends")]
        public IActionResult CheckPending(string Id)
        {
            return Ok(FrindRequest.GetFriends(Id));

        }

    }
}
