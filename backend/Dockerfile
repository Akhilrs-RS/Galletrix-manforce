FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build

WORKDIR /src

COPY ["backend.csproj", "./"]

RUN dotnet restore "backend.csproj"

COPY . .

RUN dotnet publish "backend.csproj" -c Release -o /app/publish

FROM mcr.microsoft.com/dotnet/aspnet:8.0

WORKDIR /app

COPY --from=build /app/publish .

ENV ASPNETCORE_URLS=http://+:5001
ENV ConnectionStrings__DefaultConnection="Server=manforce-mysql;Port=3306;Database=manforce_erp;User=root;Password=root;"

EXPOSE 5001

ENTRYPOINT ["dotnet", "backend.dll"]