
FROM mcr.microsoft.com/dotnet/sdk:10.0 AS build
WORKDIR /src


COPY ["ByteBack.API.csproj", "./"]
RUN dotnet restore "./ByteBack.API.csproj"


COPY . .
RUN dotnet publish "ByteBack.API.csproj" -c Release -o /app/publish

FROM mcr.microsoft.com/dotnet/aspnet:10.0 AS final
WORKDIR /app
COPY --from=build /app/publish .

EXPOSE 10000
ENV ASPNETCORE_URLS=http://+:10000

ENTRYPOINT ["dotnet", "ByteBack.API.dll"]