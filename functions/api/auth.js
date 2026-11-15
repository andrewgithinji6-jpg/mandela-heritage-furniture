// Starts GitHub login for Decap CMS (Cloudflare Pages Function)
export async function onRequest({request,env}){
  const u=new URL(request.url),state=crypto.randomUUID();
  const p=new URLSearchParams({client_id:env.GITHUB_CLIENT_ID,redirect_uri:u.origin+"/api/callback",scope:"repo,user",state});
  return new Response(null,{status:302,headers:{Location:"https://github.com/login/oauth/authorize?"+p,"Set-Cookie":`oauth_state=${state}; HttpOnly; Secure; Path=/; Max-Age=600; SameSite=Lax`}});
}
