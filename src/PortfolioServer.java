import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpServer;

import java.io.IOException;
import java.io.OutputStream;
import java.net.InetSocketAddress;
import java.nio.file.Files;
import java.nio.file.Path;

public class PortfolioServer {

    private static final int PORT = 8080;
    private static final Path PUBLIC_FOLDER = Path.of("public").toAbsolutePath().normalize();

    public static void main(String[] args) throws IOException {

        HttpServer server = HttpServer.create(new InetSocketAddress(PORT), 0);

        server.createContext("/", PortfolioServer::handleRequest);

        server.setExecutor(null);
        server.start();

        System.out.println("======================================");
        System.out.println("Portfolio Server Started Successfully");
        System.out.println("Open: http://localhost:" + PORT);
        System.out.println("======================================");
    }

    private static void handleRequest(HttpExchange exchange) throws IOException {

        String requestPath = exchange.getRequestURI().getPath();

        if (requestPath.equals("/")) {
            requestPath = "/index.html";
        }

        Path requestedFile = PUBLIC_FOLDER
                .resolve(requestPath.substring(1))
                .normalize();

        // Prevent access outside the public folder
        if (!requestedFile.startsWith(PUBLIC_FOLDER)) {
            sendTextResponse(exchange, 403, "403 - Access Denied");
            return;
        }

        if (!Files.exists(requestedFile) || Files.isDirectory(requestedFile)) {
            sendTextResponse(exchange, 404, "404 - File Not Found");
            return;
        }

        byte[] fileContent = Files.readAllBytes(requestedFile);

        exchange.getResponseHeaders().set(
                "Content-Type",
                getContentType(requestedFile)
        );

        exchange.sendResponseHeaders(200, fileContent.length);

        try (OutputStream outputStream = exchange.getResponseBody()) {
            outputStream.write(fileContent);
        }
    }

    private static String getContentType(Path file) {

        String fileName = file.getFileName().toString().toLowerCase();

        if (fileName.endsWith(".html")) {
            return "text/html; charset=UTF-8";
        }

        if (fileName.endsWith(".css")) {
            return "text/css; charset=UTF-8";
        }

        if (fileName.endsWith(".js")) {
            return "application/javascript; charset=UTF-8";
        }

        if (fileName.endsWith(".png")) {
            return "image/png";
        }

        if (fileName.endsWith(".jpg") || fileName.endsWith(".jpeg")) {
            return "image/jpeg";
        }

        if (fileName.endsWith(".svg")) {
            return "image/svg+xml";
        }

        if (fileName.endsWith(".pdf")) {
            return "application/pdf";
        }

        return "application/octet-stream";
    }

    private static void sendTextResponse(
            HttpExchange exchange,
            int statusCode,
            String message
    ) throws IOException {

        byte[] response = message.getBytes();

        exchange.getResponseHeaders().set(
                "Content-Type",
                "text/plain; charset=UTF-8"
        );

        exchange.sendResponseHeaders(statusCode, response.length);

        try (OutputStream outputStream = exchange.getResponseBody()) {
            outputStream.write(response);
        }
    }
}