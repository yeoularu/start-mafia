import { createFileRoute } from "@tanstack/react-router";
import { orpc } from "@/utils/orpc";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";

export const Route = createFileRoute("/")({
  component: HomeComponent,
});

const TITLE_TEXT = `
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢠⣾⣿⣿⣷⣦⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢠⣿⣿⣿⣿⣿⣿⣿⣦⡀⠒⢶⣄⠀⠀⠀⠀⠀⠀⠀
⠀⢰⣶⣷⣶⣶⣤⣄⠀⣠⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷⣾⣿⡆⠀⠀⠀⠀⠀⠀
⠀⢿⣿⣿⣿⣿⡟⢁⣄⠙⠿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠃⠀⠀⠀⠀⠀⠀
⠀⠘⣿⣿⣿⣿⣧⡈⠻⢷⣦⣄⡉⠛⠿⢿⣿⣿⣿⣿⣿⣿⣿⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠈⠻⣿⣿⣿⣿⣶⣄⡈⠙⠻⢷⣶⣤⣄⣈⡉⠛⠛⠛⠃⢠⣀⣀⡀⠀⠀⠀
⠀⠀⠀⠀⠈⠙⠻⢿⣿⣿⣿⣿⣶⣦⣤⣍⣉⠙⠛⠛⠛⠿⠃⢸⣿⣿⣿⣷⡀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠈⠙⠻⠿⣿⣿⣿⣿⣿⣿⣿⣷⣶⣶⣾⣿⣿⣿⣿⣿⣧⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠉⠙⠛⠻⠏⠀⠉⠻⢿⣿⣿⣿⣿⠿⠋⠀
`;

function HomeComponent() {
  const {
    data: session,
    isPending, //loading state
    error, //error object
    refetch, //refetch the session
  } = authClient.useSession();

  const handleClick = async () => {
    if (!session) {
      const res = await authClient.signIn.anonymous();
      console.log(res);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-dvh space-y-8">
      <pre className="overflow-x-auto font-mono text-sm/4.5">{TITLE_TEXT}</pre>
      <p>Hello, {session?.user.name}</p>
      <Button size="lg" className="text-xl font-semibold" onClick={handleClick}>
        Start Mafia
      </Button>
    </div>
  );
}
